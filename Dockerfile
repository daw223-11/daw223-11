FROM php:8.2-apache

# Instalación de zip
RUN apt-get update \
    && apt-get install -y libzip-dev \
    && apt-get install -y zlib1g-dev \
    && apt-get install -y libpng-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install zip

# Nodejs y NPM
RUN RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt install -y nodejs

# CONEXIÓN BBDD
RUN docker-php-ext-install gd && docker-php-ext-enable gd
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN docker-php-ext-install pdo && docker-php-ext-enable pdo
RUN apt-get update \
    && apt-get install -y default-mysql-client libpq-dev \
    && docker-php-ext-install pdo_mysql

# Por si hace falta hacer git clone
RUN apt-get install -y git
RUN git clone https://github.com/daw223-11/wp-julianmarias.git

# Mover intranet y wordpress a /var/www/html
RUN mv web/* ./

WORKDIR spa-intranet

# Build de la SPA
RUN npm run build

RUN rm -fr ../intranet/front/*

RUN mv build/* ../intranet/front/

# Elimina los archivos restantes
WORKDIR ../
RUN rm -fr bbdd && rm -fr image-ia && rm -fr docker-compose.yml && rm -fr DockerFile && rm -fr spa-intranet && rm -fr sites-available && rm -fr web

WORKDIR intranet/intranet-api
RUN ./composer.phar install
RUN php artisan passport:keys

WORKDIR /var/www/html

# SITE CONF
RUN rm -r /etc/apache2/sites-available/000-default.conf
COPY sites-available /etc/apache2/sites-available/
RUN a2ensite sites.conf
# Instalación de imagick
RUN apt-get update && apt-get install -y libmagickwand-dev --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN pecl install imagick-beta
RUN docker-php-ext-enable imagick

# Instalación de exif
RUN docker-php-ext-install exif && docker-php-ext-enable exif

# Instalación 
RUN apt-get install -y libicu-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl


RUN chown -R www-data:www-data /var/www/html
# IMPORTANTE
RUN a2enmod rewrite
EXPOSE 80
