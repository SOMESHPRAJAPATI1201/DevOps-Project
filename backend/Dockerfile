# -------- Stage 1: Build --------
FROM maven:3.9.4-eclipse-temurin-21-alpine AS build

WORKDIR /build

COPY . .

RUN mvn clean package -DskipTests

# -------- Stage 2: Run --------
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /build/target/generics-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
