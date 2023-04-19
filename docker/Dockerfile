FROM php:8.0.0-apache
RUN chown -R www-data:www-data /var/www/html
RUN docker-php-ext-install mysqli
RUN apt-get update \
    && apt-get install -y libzip-dev \
    && apt-get install -y zlib1g-dev \
    && apt-get install -y libpng-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install zip
RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql && docker-php-ext-install gd && docker-php-ext-enable gd

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