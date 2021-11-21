FROM nginx

COPY default.conf.template /etc/nginx/conf.d/default.conf.template

# setup Nginx; make sure that proxy server is running on correct port
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'

# Update available packages in Debian
RUN apt-get update

# Install curl cmd line tool
RUN apt-get install curl -y

# Fetch node16.13.0 from nodesource
RUN curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh

# Run setup script
RUN bash nodesource_setup.sh

# install nodejs and npm
RUN apt install nodejs -y

# install bash
RUN apt-get install bash

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Copy everything
COPY . .

# Do a clean install based on package-lock file
RUN npm ci

# Build frontend
RUN npm run build

# Expose port picked by Heroku. 
EXPOSE $PORT