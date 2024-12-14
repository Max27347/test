from io import BytesIO
import pygame
import random
import sys
import requests

# Инициализация Pygame
pygame.init()

# Константы
WIDTH, HEIGHT = 400, 600  # Вертикальный экран
FPS = 60  # Устанавливаем FPS на 60
BLUE_BACKGROUND = (173, 216, 230)  # Светло-голубой цвет (RGB)
WHITE = (255, 255, 255)

# Настройка экрана
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Избегай бомб!")

# Функция для загрузки изображения из URL
def load_image_from_url(url, size):
    response = requests.get(url)
    if response.status_code == 200:
        image_data = BytesIO(response.content)
        image = pygame.image.load(image_data).convert_alpha()  # Используем convert_alpha() для поддержки прозрачности
        return pygame.transform.scale(image, size)  # Изменяем размер изображения
    else:
        print(f"Ошибка загрузки изображения: {response.status_code}")
        sys.exit()

# Класс Игрока
class Player:
    def __init__(self):
        self.image = load_image_from_url('https://avatars.mds.yandex.net/i?id=42fa6c1105a61f3f21341e35f9544a89441fe060-5234009-images-thumbs&n=13', (50, 50))
        self.rect = self.image.get_rect()
        self.rect.centerx = WIDTH // 2
        self.rect.bottom = HEIGHT - 10

    def move(self, dx):
        self.rect.x += dx
        # Ограничиваем движение игрока в пределах экрана
        if self.rect.left < 0:
            self.rect.left = 0
        if self.rect.right > WIDTH:
            self.rect.right = WIDTH

    def draw(self):
        screen.blit(self.image, self.rect)


# Класс Бомбы
class Bomb:
    def __init__(self):
        self.image = load_image_from_url('https://avatars.mds.yandex.net/i?id=024f70cbc561737ed31b8a0e9eaa1fb8378543edadea12ea-11477006-images-thumbs&n=13', (30, 30))
        self.rect = self.image.get_rect()
        self.reset()
        self.speed = 1  # Начальная скорость падения

    def reset(self):
        self.rect.x = random.randint(0, WIDTH - self.rect.width)
        self.rect.y = random.randint(-100, -40)  # Начальная позиция выше экрана

    def fall(self):
        self.rect.y += self.speed  # Падение с текущей скоростью

    def increase_speed(self):
        if self.speed < 15:  # Максимальная скорость (можно настроить)
            self.speed += 0.002  # Увеличиваем скорость

    def draw(self):
        screen.blit(self.image, self.rect)


# Основная игровая логика
def main():
    clock = pygame.time.Clock()
    player = Player()
    bombs = [Bomb() for _ in range(5)]  # Создаем несколько бомб

    score = 0

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            player.move(-10)
        if keys[pygame.K_RIGHT]:
            player.move(10)

        # Обновление позиции бомб и увеличение их скорости
        for bomb in bombs:
            bomb.fall()
            bomb.increase_speed()  # Увеличиваем скорость падения бомбы

            if bomb.rect.top > HEIGHT:  # Если бомба вышла за пределы экрана
                bomb.reset()  # Сбрасываем ее на верх экрана
                score += 1   # Увеличиваем счет за избежание бомбы

            # Проверка на столкновение с игроком
            if player.rect.colliderect(bomb.rect):
                print(f"Игра окончена! Ваш счет: {score}")
                pygame.quit()
                sys.exit()

        # Отрисовка элементов на экране
        screen.fill(BLUE_BACKGROUND)  # Заменяем фон на голубой

        player.draw()

        for bomb in bombs:
            bomb.draw()

        # Отображение счета
        font = pygame.font.Font(None, 36)
        score_text = font.render(f"Счет: {score}", True, (0, 0, 0))
        screen.blit(score_text, (10, 10))

        # Обновление экрана
        pygame.display.flip()

        clock.tick(FPS)  # Ограничиваем FPS до заданного значения


# Запуск игры
if __name__ == "__main__":
    main()
