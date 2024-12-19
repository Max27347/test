import pygame
import random
import sys

# Инициализация Pygame
pygame.init()

# Константы
WIDTH, HEIGHT = 400, 550  # Увеличиваем размер экрана (ширина: 800, высота: 600)
FPS = 60  # Устанавливаем FPS на 60

# Настройка экрана
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Избегай бомб!")

# Функция для загрузки изображения из файла
def load_image_from_file(file_path, size=None):
    image = pygame.image.load(file_path).convert_alpha()  # Загружаем изображение
    if size:
        return pygame.transform.scale(image, size)  # Изменяем размер изображения
    return image

# Класс Игрока
class Player:
    def __init__(self):
        self.image = load_image_from_file('D:/brawl_clicker-master/static/images/colt.png', (80, 110))  # Увеличиваем размер игрока
        self.rect = self.image.get_rect()
        self.rect.centerx = WIDTH // 2
        self.rect.bottom = HEIGHT - 20

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
        self.image = load_image_from_file('D:/brawl_clicker-master/static/images/dyno.png', (30, 40))  # Увеличиваем размер бомб
        self.rect = self.image.get_rect()
        self.reset()
        self.speed = 2  # Начальная скорость падения

    def reset(self):
        self.rect.x = random.randint(0, WIDTH - self.rect.width)
        self.rect.y = random.randint(-100, -40)  # Начальная позиция выше экрана

    def fall(self):
        self.rect.y += self.speed  # Падение с текущей скоростью

    def increase_speed(self):
        if self.speed < 10:  # Максимальная скорость (можно настроить)
            self.speed += 0.002  # Увеличиваем скорость

    def draw(self):
        screen.blit(self.image, self.rect)

# Класс Кнопки
class Button:
    def __init__(self, x, y, image_path, width, height):
        self.image = load_image_from_file(image_path, (width, height))  # Загружаем изображение кнопки
        self.rect = self.image.get_rect()
        self.rect.topleft = (x, y)

    def draw(self):
        screen.blit(self.image, self.rect)

    def is_pressed(self):
        mouse_pos = pygame.mouse.get_pos()
        return self.rect.collidepoint(mouse_pos)

# Основная игровая логика
def main():
    clock = pygame.time.Clock()
    player = Player()
    bombs = []  # Список бомб, изначально пустой

    score = 0

    # Загружаем фон
    background_image = load_image_from_file('D:/brawl_clicker-master/static/images/brawl_stars_lobby.png', (1000, 700))  # Замените путь на свой

    # Создание кнопок управления с изображениями
    left_button = Button(50, HEIGHT - 100, 'D:/brawl_clicker-master/static/images/left_arrow.png', 100, 60)   # Кнопка влево
    right_button = Button(WIDTH - 150, HEIGHT - 100, 'D:/brawl_clicker-master/static/images/right_arrow.png', 100, 60)   # Кнопка вправо

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

            if event.type == pygame.MOUSEBUTTONDOWN:
                if left_button.is_pressed():
                    player.move(-30)   # Увеличиваем скорость до -30 при удержании кнопки влево
                if right_button.is_pressed():
                    player.move(30)   # Увеличиваем скорость до +30 при удержании кнопки вправо

        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            player.move(-30)   # Увеличиваем скорость до -30 при удержании клавиши влево
        if keys[pygame.K_RIGHT]:
            player.move(30)   # Увеличиваем скорость до +30 при удержании клавиши вправо

        # Добавляем новую бомбу с меньшей вероятностью (реже)
        if random.random() < 0.01:  # 2% шанс добавить новую бомбу каждую итерацию (реже)
            bombs.append(Bomb())

        # Обновление позиции бомб и увеличение их скорости
        for bomb in bombs[:]:  # Перебираем копию списка, чтобы удалять элементы во время итерации
            bomb.fall()
            bomb.increase_speed()

            if bomb.rect.top > HEIGHT:
                bomb.reset()
                score += 1

            if player.rect.colliderect(bomb.rect):
                print(f"Игра окончена! Ваш счет: {score}")
                pygame.quit()
                sys.exit()

        # Отрисовка фона
        screen.blit(background_image, (0, 0))  # Отрисовываем фон

        # Отрисовка игрока
        player.draw()

        # Отрисовка бомб
        for bomb in bombs:
            bomb.draw()

        # Отрисовка кнопок управления
        left_button.draw()
        right_button.draw()

        # Отображение счета
        font = pygame.font.Font(None, 48)  # Увеличиваем размер шрифта
        score_text = font.render(f"Счет: {score}", True, (255, 255, 255))
        screen.blit(score_text, (10, 10))

        pygame.display.flip()

        clock.tick(FPS)

# Запуск игры
if __name__ == "__main__":
    main()
