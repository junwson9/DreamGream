#!/bin/sh
if [ "$SPRING_PROFILES_ACTIVE" = "dev" ]; then
  java -jar /app-dev.jar
elif [ "$SPRING_PROFILES_ACTIVE" = "prod" ]; then
  java -jar /app-prod.jar
else
  echo "Invalid or missing SPRING_PROFILES_ACTIVE value"
  exit 1
fi