# .
FROM python:3.6-slim

RUN apt-get clean \
    && apt-get -y update

RUN apt-get -y install \
    nginx \
    python3-dev \
    build-essential

WORKDIR /flask-backend

COPY flask-backend/requirements.txt /flask-backend/requirements.txt
RUN pip install -r requirements.txt --src /usr/local/src

COPY /flask-backend/ .

EXPOSE 5000

ENTRYPOINT [ "flask" ]
CMD ["run", "--host=0.0.0.0", "--port=5000"]
