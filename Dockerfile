FROM php:8.2-apache
RUN chown -R www-data:www-data /var/www/html
RUN apt-get update \
    && apt-get install -y libzip-dev \
    && apt-get install -y zlib1g-dev \
    && apt-get install -y libpng-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install zip
RUN docker-php-ext-install gd && docker-php-ext-enable gd
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN docker-php-ext-install pdo && docker-php-ext-enable pdo
# RUN docker-php-ext-install pdo_mysql && docker-php-ext-enable pdo_mysql
RUN apt-get update \
    && apt-get install -y default-mysql-client libpq-dev \
    && docker-php-ext-install pdo_mysql
RUN rm -r /etc/apache2/sites-available/000-default.conf
COPY sites-available /etc/apache2/sites-available/
RUN a2ensite sites.conf
# Instalación de imagick
# RUN apt-get install -y libmagickwand-dev && rm -rf /var/lib/apt/lists/*
# RUN mkdir -p /usr/src/php/ext/imagick; \
#    curl -fsSL https://github.com/Imagick/imagick/archive/06116aa24b76edaf6b1693198f79e6c295eda8a9.tar.gz | tar xvz -C "/usr/src/php/ext/imagick" --strip 1;
# RUN docker-php-ext-install imagick && docker-php-ext-enable imagick
RUN apt-get update && apt-get install -y libmagickwand-dev --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN pecl install imagick-beta
RUN docker-php-ext-enable imagick
RUN docker-php-ext-install exif && docker-php-ext-enable exif
RUN apt-get install -y libicu-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl
# RUN chmod +x /usr/local/bin/install-php-extensions && \
#    install-php-extensions gd


# RUN apt-get update && apt-get install -y \
# 		libfreetype6-dev \
# 		libjpeg62-turbo-dev \
# 		libpng-dev \
# 	&& docker-php-ext-configure gd --with-freetype --with-jpeg \
# 	&& docker-php-ext-install -j$(nproc) gd
# RUN install-php-extensions gd
RUN a2enmod rewrite
EXPOSE 80
