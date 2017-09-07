FROM nginx:1.13.3

RUN apt-get update && apt-get install -y ruby

EXPOSE 80 443

COPY ./config.rb /
COPY ./docker-entrypoint.sh /root
COPY ./nginx/default.conf /etc/nginx/conf.d

COPY dist/ /usr/share/nginx/html

ENTRYPOINT ["/root/docker-entrypoint.sh"]
