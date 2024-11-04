import telebot
from secrets import secrets
from telebot import types


token = secrets.get('BOT_API_TOKEN')
bot = telebot.TeleBot(token)

user_states = {}

STATE_ASK_SPECIES = 1
STATE_ASK_LOCATION = 2
STATE_ASK_PHOTO = 3


@bot.message_handler(commands=['start'])
def start_message(message):
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    action_button1 = types.KeyboardButton("Отправить информацию о животном/растении")
    action_button2 = types.KeyboardButton("История обращений")
    markup.add(action_button1, action_button2)
    bot.send_message(message.chat.id, f"Привет, {message.from_user.first_name} \n(づ◔ ʖ◔)づ", reply_markup=markup)


@bot.message_handler(content_types=['text', 'location', 'photo'])
def buttons(message):
    user_state = user_states.get(message.chat.id)

    if user_state is None:
        if message.text == "Отправить информацию о животном/растении":
            bot.send_message(message.chat.id, "Укажите название вида")
            user_states[message.chat.id] = STATE_ASK_SPECIES
        elif message.text == "История обращений":
            bot.send_message(message.chat.id, "Конечно, вот история твоих обращений:")
        else:
            bot.send_message(message.chat.id, "Я могу отвечать только на нажатие кнопок")

    elif user_state == STATE_ASK_SPECIES and message.content_type == 'text':
        bot.send_message(message.chat.id, "Теперь укажите геопозицию, где обитает этот вид.")
        user_states[message.chat.id] = STATE_ASK_LOCATION

    elif user_state == STATE_ASK_LOCATION and message.content_type == 'location':
        bot.send_message(message.chat.id, f"Отлично! Ты ввел координаты: {message.location.latitude}, {message.location.longitude}. Теперь прикрепите фото вида.")
        user_states[message.chat.id] = STATE_ASK_PHOTO

    elif user_state == STATE_ASK_PHOTO and message.content_type == 'photo':
        bot.send_message(message.chat.id, "Спасибо! Ваша информация отправлена.")
        user_states.pop(message.chat.id, None)
    else:
        bot.send_message(message.chat.id, "Отправьте корректные данные для продолжения.")

bot.polling(none_stop=True, interval=0)
