FROM ubuntu:22.04

WORKDIR /var/www/html

COPY index.html /var/www/html
COPY style.css  /var/www/html

RUN apt-get update
RUN apt-get install nginx -y

CMD ["nginx", "-g", "daemon off;"]
