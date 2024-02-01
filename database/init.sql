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
                                                email VARCHAR(255) NOT NULL UNIQUE,
                                                username VARCHAR(100) NOT NULL UNIQUE,
                                                password VARCHAR(255) NOT NULL,
                                                is_admin BOOLEAN NOT NULL DEFAULT false
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
                                                      name TEXT NOT NULL,
                                                      user_id INTEGER NOT NULL REFERENCES users_schema.users (id),
                                                      photo BYTEA,
                                                      quantity INTEGER NOT NULL DEFAULT 0,
                                                      price DECIMAL(10, 2) NOT NULL DEFAULT 0,
                                                      description TEXT,
                                                      category TEXT,
                                                      created_at TIMESTAMP NOT NULL,
                                                      is_active BOOLEAN NOT NULL
            );
            RAISE NOTICE 'Создана таблица products_schema.products';
        ELSE
            RAISE NOTICE 'Таблица products_schema.products уже существует';
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'users_schema' AND table_name = 'carts') THEN
            CREATE TABLE users_schema.carts (
                                                id SERIAL PRIMARY KEY,
                                                product_id INTEGER NOT NULL REFERENCES products_schema.products(id),
                                                user_id INTEGER NOT NULL REFERENCES users_schema.users(id)

            );
            RAISE NOTICE 'Создана таблица users_schema.carts';
        ELSE
            RAISE NOTICE 'Таблица users_schema.carts уже существует';
        END IF;

    END $$;
