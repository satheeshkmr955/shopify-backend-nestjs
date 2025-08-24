FROM alpine:3.22

RUN apk update && \
    apk add --no-cache logrotate cronie

RUN mkdir -p /logs /etc/logrotate.d/

COPY logrotate.conf /etc/logrotate.d/app-logs
RUN chmod 0644 /etc/logrotate.d/app-logs

RUN echo "* * * * * /usr/sbin/logrotate /etc/logrotate.d/app-logs > /dev/null 2>&1" >> /etc/crontabs/root
RUN chmod 0600 /etc/crontabs/root

CMD ["crond", "-f"]
