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
def load_image_from_file(file_path, size):
    image = pygame.image.load(file_path).convert_alpha()  # Загружаем изображение
    return pygame.transform.scale(image, size)  # Изменяем размер изображения

# Класс Игрока
class Player:
    def __init__(self):
        self.image = load_image_from_file('D:/brawl_clicker-master/static/images/edgar.png', (50, 50))
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
        self.image = load_image_from_file('D:/brawl_clicker-master/static/images/dyno.png', (30, 30))
        self.rect = self.image.get_rect()
        self.reset()
        self.speed = 3  # Начальная скорость падения

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
