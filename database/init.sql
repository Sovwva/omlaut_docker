DO $$
BEGIN
    -- Создание схемы для пользователей
    IF NOT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'users_schema') THEN
CREATE SCHEMA users_schema;
RAISE NOTICE 'Создана схема users_schema';
ELSE
        RAISE NOTICE 'Схема users_schema уже существует';
END IF;

    -- Создание таблицы пользователей
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'users_schema' AND table_name = 'users') THEN
CREATE TABLE users_schema.users (
                                    id SERIAL PRIMARY KEY,
                                    email VARCHAR(255) NOT NULL,
                                    password VARCHAR(255) NOT NULL,
                                    username VARCHAR(100) NOT NULL,
                                    is_admin BOOLEAN NOT NULL
);
RAISE NOTICE 'Создана таблица users_schema.users';
ELSE
        RAISE NOTICE 'Таблица users_schema.users уже существует';
END IF;

    -- Создание схемы для продуктов
    IF NOT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'products_schema') THEN
CREATE SCHEMA products_schema;
RAISE NOTICE 'Создана схема products_schema';
ELSE
        RAISE NOTICE 'Схема products_schema уже существует';
END IF;

    -- Создание таблицы продуктов
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'products_schema' AND table_name = 'products') THEN
CREATE TABLE products_schema.products (
                                          id SERIAL PRIMARY KEY,
                                          user_id INTEGER NOT NULL,
                                          name VARCHAR(255) NOT NULL,
                                          price DECIMAL(10, 2) NOT NULL,
                                          photo BYTEA,
                                          created_at TIMESTAMP NOT NULL,
                                          product_type VARCHAR(100),
                                          FOREIGN KEY (user_id) REFERENCES users_schema.users(id)
);
RAISE NOTICE 'Создана таблица products_schema.products';
ELSE
        RAISE NOTICE 'Таблица products_schema.products уже существует';
END IF;
END $$;
