import re
import pandas as pd
import numpy as np
import os

# Функция для поиска и извлечения текста по регулярному выражению
def find_re(pattern, text):
    match = re.search(pattern, text)
    return match.group(1).strip() if match else None

# Функция для парсинга информации о каждом виде из текста
def parse_animal(text):
    animal_data = {}

    # Регулярные выражения для различных полей
    regex_patterns = {
        "Название на русском": r'\s([А-ЯЁ\s\/-/,]{5,})',
        "Порядок": r'Порядок\s([\w\s/,ё/-]+)\s–',
        "Семейство": r'Семейство\s([\w\s/,ё/-]+)\s–',
        "Статус": r'Статус\.\s(.+?)\x1f',
        "Распространение": r'Распространение\.\s(.+?)\x1f',
        "Численность": r'Численность\.\s(.+?)\x1f',
        "Особенности обитания": r'Особенности обитания\.\s(.+?)\x1f',
        "Лимитирующие факторы": r'Лимитирующие факторы\.\s(.+?)\x1f',
        "Принятые меры охраны": r'Принятые меры охраны\.\s(.+?)\x1f',
        "Изменения состояния вида": r'Изменени[яе] состояния вида\.\s(.+?)\x1f',
        "Необходимые мероприятия по сохранению вида": r'Необходимые мероприятия по сохранению вида\.\s(.+?)\x1f',
        "Источники информации": r'Источники информации\.\s(.+?)\x1f'
    }
    
    # Поиск информации по каждому регулярному выражению
    for key, pattern in regex_patterns.items():
        animal_data[key] = find_re(pattern, text)

    return animal_data

# Функция для обработки текстового файла и сохранения его в Excel
def parse_text_file_to_excel(file_path, output_excel_path):
    with open('PythonParserAnimals\\' + file_path, "r", encoding="utf-8") as file:
        text = file.read()

    # Очистка текста от лишних символов и заголовков
    text = text.replace("- ", "")
    stop_words = ['ЖИВОТНЫЕ', 'Млекопитающие', 'Рыбы', 'Птицы', 'Пресмыкающиеся и земноводные', 'Беспозвоночные', 
                  'Сосудистые растения', 'РАСТЕНИЯ И ГРИБЫ', 'Моховидные', 'Водоросли', 'Лишайники', 'Грибы']
    for word in stop_words:
        text = re.sub(r'\n' + re.escape(word) + r'\n', '\n', text)

    text = re.sub(r'\n\d+\n{1,3}', '\n', text)
    text = re.sub(r'Фото:\s.+\n', '\n', text)

    # Разделение текста на блоки для каждого животного
    animals = re.split(r'Автор[ы]?\:\s.+?\n', text)[:-1]
    animal_list = [parse_animal(animal.replace("\n", " ")) for animal in animals]

    # Преобразование данных в DataFrame и сохранение в Excel
    df = pd.DataFrame(animal_list)
    df = df.replace("", None)
    df.to_excel(output_excel_path, index=False)

# Список текстовых файлов для парсинга и их соответствующих выходных Excel-файлов
text_files = [
    ('Animal.txt', 'animals_table.xlsx', 'Млекопитающие'),
    ('Bird1.txt', 'bird1_table.xlsx', 'Птицы'),
    ('Bird2.txt', 'bird2_table.xlsx', 'Птицы'),
    ('Amphibians.txt', 'amphibians_table.xlsx', 'Пресмыкающиеся и земноводные'),
    ('Fish.txt', 'fish_table.xlsx', 'Рыбы'),
    ('Invertebrates1.txt', 'invertebrates1_table.xlsx', 'Беспозвоночные'),
    ('Invertebrates2.txt', 'invertebrates2_table.xlsx', 'Беспозвоночные'),
    ('Invertebrates3.txt', 'invertebrates3_table.xlsx', 'Беспозвоночные'),
    ('Invertebrates4.txt', 'invertebrates4_table.xlsx', 'Беспозвоночные'),
    ('Invertebrates5.txt', 'invertebrates5_table.xlsx', 'Беспозвоночные'),
    ('Vascular_plants1.txt', 'vascular_plants1_table.xlsx', 'Сосудистые растения'),
    ('Vascular_plants2.txt', 'vascular_plants2_table.xlsx', 'Сосудистые растения'),
    ('Mossy.txt', 'mossy_table.xlsx', 'Моховидные'),
    ('Seaweed.txt', 'seaweed_table.xlsx', 'Водоросли'),
    ('Lichens.txt', 'lichens_table.xlsx', 'Лишайники'),
    ('Mushrooms.txt', 'mushrooms_table.xlsx', 'Грибы')
]

# Парсинг текстовых файлов и создание промежуточных Excel-файлов
for text_file, output_excel, section_name in text_files:
    parse_text_file_to_excel(text_file, output_excel)
    print(f'Parsed {text_file} and saved to {output_excel}')

# Функция для добавления столбцов классификации и объединения таблиц
def prepare_table(file_path, section_name, extra_cols):
    df = pd.read_excel(file_path)
    df.insert(1, 'Раздел', section_name)
    for col_name, col_value in extra_cols:
        df[col_name] = col_value
    return df

# Информация о файлах и соответствующих данных
files_info = [
    ('animals_table.xlsx', 'Млекопитающие', [('Порядок', np.nan), ('Отдел', np.nan)]),
    ('bird1_table.xlsx', 'Птицы', [('Порядок', np.nan), ('Отдел', np.nan)]),
    ('bird2_table.xlsx', 'Птицы', [('Порядок', np.nan), ('Отдел', np.nan)]),
    ('amphibians_table.xlsx', 'Пресмыкающиеся и земноводные', [('Порядок', np.nan), ('Отдел', np.nan)]),
    ('fish_table.xlsx', 'Рыбы', [('Порядок', np.nan), ('Отдел', np.nan)]),
    ('invertebrates1_table.xlsx', 'Беспозвоночные', [('Порядок', np.nan), ('Отдел', np.nan)]),
    ('invertebrates2_table.xlsx', 'Беспозвоночные', [('Порядок', np.nan), ('Отдел', np.nan)]),
    ('invertebrates3_table.xlsx', 'Беспозвоночные', [('Порядок', np.nan), ('Отдел', np.nan)]),
    ('invertebrates4_table.xlsx', 'Беспозвоночные', [('Порядок', np.nan), ('Отдел', np.nan)]),
    ('invertebrates5_table.xlsx', 'Беспозвоночные', [('Порядок', np.nan), ('Отдел', np.nan)]),
    ('vascular_plants1_table.xlsx', 'Сосудистые растения', [('Отряд', np.nan), ('Отдел', np.nan)]),
    ('vascular_plants2_table.xlsx', 'Сосудистые растения', [('Отряд', np.nan), ('Отдел', np.nan)]),
    ('mossy_table.xlsx', 'Моховидные', [('Отряд', np.nan), ('Отдел', np.nan)]),
    ('seaweed_table.xlsx', 'Водоросли', [('Отряд', np.nan), ('Порядок', np.nan)]),
    ('lichens_table.xlsx', 'Лишайники', [('Отряд', np.nan), ('Отдел', np.nan)]),
    ('mushrooms_table.xlsx', 'Грибы', [('Отряд', np.nan), ('Отдел', np.nan)])
]

# Объединение всех файлов в одну таблицу
combined_df = pd.DataFrame()
for file_path, section_name, extra_cols in files_info:
    df = prepare_table(file_path, section_name, extra_cols)
    combined_df = pd.concat([combined_df, df], ignore_index=True)

# Сохранение объединённой таблицы в Excel
combined_df.to_excel('Concat_table.xlsx', index=False)
print("All files combined and saved to Full_table.xlsx")