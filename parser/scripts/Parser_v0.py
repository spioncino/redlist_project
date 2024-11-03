import re
import pandas as pd

# Функция для поиска и извлечения текста по регулярному выражению
def find_re(pattern, text):
    """
    Ищет текст по заданному регулярному выражению и возвращает первую найденную группу.
    Если совпадения не найдено, возвращает None.
    """
    match = re.search(pattern, text)
    return match.group(1).strip() if match else None

# Основная функция для парсинга информации о каждом виде животного
def parse_animal(text):
    """
    Извлекает информацию о животном из текстового блока.
    Возвращает словарь с данными о виде, включая название, семейство, статус и другие поля.
    """
    animal_data = {}

    # Название на русском языке
    regex_name_rus = r'\s([А-ЯЁ\s\/-/,]{5,})'
    animal_data["Название на русском"] = find_re(regex_name_rus, text)

    # Порядок (таксономическая категория)
    regex_order = r'Порядок\s([\w\s/,ё/-]+)\s–'
    animal_data["Порядок"] = find_re(regex_order, text)

    # Семейство (таксономическая категория)
    regex_family = r'Семейство\s([\w\s/,ё/-]+)\s–'
    animal_data["Семейство"] = find_re(regex_family, text)

    # Статус (категория редкости)
    regex_status = r'Статус\.\s(.+?)\x1f'
    animal_data["Статус"] = find_re(regex_status, text)

    # Распространение (где обитает вид)
    regex_distribution = r'Распространение\.\s(.+?)\x1f'
    animal_data["Распространение"] = find_re(regex_distribution, text)

    # Численность (информация о популяции)
    regex_population = r'Численность\.\s(.+?)\x1f'
    animal_data["Численность"] = find_re(regex_population, text)

    # Особенности обитания (среда обитания и поведение)
    regex_habitat = r'Особенности обитания\.\s(.+?)\x1f'
    animal_data["Особенности обитания"] = find_re(regex_habitat, text)

    # Лимитирующие факторы (ограничивающие факторы)
    regex_limiting_factors = r'Лимитирующие факторы\.\s(.+?)\x1f'
    animal_data["Лимитирующие факторы"] = find_re(regex_limiting_factors, text)

    # Принятые меры охраны
    regex_conservation_measures = r'Принятые меры охраны\.\s(.+?)\x1f'
    animal_data["Принятые меры охраны"] = find_re(regex_conservation_measures, text)

    # Изменения состояния вида
    regex_state_changes = r'Изменени[яе] состояния вида\.\s(.+?)\x1f'
    animal_data["Изменения состояния вида"] = find_re(regex_state_changes, text)

    # Необходимые мероприятия по сохранению вида
    regex_conservation_needs = r'Необходимые мероприятия по сохранению вида\.\s(.+?)\x1f'
    animal_data["Необходимые мероприятия по сохранению вида"] = find_re(regex_conservation_needs, text)

    # Источники информации
    regex_sources = r'Источники информации\.\s(.+?)\x1f'
    animal_data["Источники информации"] = find_re(regex_sources, text)

    return animal_data

# Открытие и чтение текстового файла с данными из PDF
file_path = "Mushrooms.txt"
with open(file_path, "r", encoding="utf-8") as file:
    text = file.read()

# Удаляем переносы, чтобы избежать ошибок при поиске
text = text.replace("- ", "")

# Удаление ненужных заголовков разделов
stop_words = ['ЖИВОТНЫЕ', 'Млекопитающие', 'Рыбы', 'Птицы', 'Пресмыкающиеся и земноводные', 'Беспозвоночные', 
              'Сосудистые растения', 'РАСТЕНИЯ И ГРИБЫ', 'Моховидные', 'Водоросли', 'Лишайники', 'Грибы']
for word in stop_words:
    text = re.sub(r'\n' + re.escape(word) + r'\n', '\n', text)

# Удаляем строки с номерами страниц и лишними элементами оформления
text = re.sub(r'\n\d+\n{1,3}', '\n', text)
text = re.sub(r'Фото:\s.+\n', '\n', text)

# Разделение текста на блоки для каждого животного по ключевому слову "Автор"
animals = re.split(r'Автор[ы]?\:\s.+?\n', text)[:-1]

# Парсинг данных для каждого животного
animal_list = [parse_animal(animal.replace("\n", " ")) for animal in animals]

# Преобразование данных в DataFrame для удобства работы с таблицей
df = pd.DataFrame(animal_list)

# Замена пустых строк на None
df = df.replace("", None)

# Сохранение итоговой таблицы в Excel файл
df.to_excel("mushrooms_table.xlsx", index=False)

# Проверка, сколько строк и пустых значений в каждом столбце
print(df.shape[0])
print(df.isna().sum())
