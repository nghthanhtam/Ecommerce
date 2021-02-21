FROM node:alpine as builder

# set the working dir for container
WORKDIR /frontend

# copy the json file first
COPY ./package.json /frontend

# install npm dependencies
RUN yarn install

ARG REACT_APP_BACKEND_EMPLOYEE
ENV REACT_APP_BACKEND_EMPLOYEE=http://3.0.21.229:8000/employee
ARG REACT_APP_BACKEND_ADMIN
ENV REACT_APP_BACKEND_ADMIN=http://3.0.21.229:8000/admin
ARG REACT_APP_BACKEND_PRODUCT
ENV REACT_APP_BACKEND_PRODUCT=http://3.0.21.229:8000/product
ARG REACT_APP_BACKEND_USER
ENV REACT_APP_BACKEND_USER=http://3.0.21.229:8000/user
ARG REACT_APP_BACKEND_ORDER
ENV REACT_APP_BACKEND_ORDER=http://3.0.21.229:8000/order
ARG REACT_APP_BACKEND_RATING
ENV REACT_APP_BACKEND_RATING=http://3.0.21.229:8000/rating
ARG REACT_APP_BACKEND_LOGGING
ENV REACT_APP_BACKEND_LOGGING=http://3.0.21.229:8000/loging
ARG REACT_APP_BACKEND_PROMOTION
ENV REACT_APP_BACKEND_PROMOTION=http://3.0.21.229:8000/promotion
ARG REACT_APP_BACKEND_RECOMMEND
ENV REACT_APP_BACKEND_RECOMMEND=http://3.0.21.229:8000/recommend

# copy other project files
COPY . .

# build the folder
RUN yarn run build

# Handle Nginx
FROM nginx
COPY --from=builder /frontend/build /usr/share/nginx/html
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80