-- Use your preferred database
CREATE DATABASE IF NOT EXISTS OwnerAdoptionDB;
USE OwnerAdoptionDB;

-- Table for Users
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(255) NOT NULL,
    AgeRange VARCHAR(50),
    Location VARCHAR(255),
    Email VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(50),
    WorkSchedule VARCHAR(100),
    PetOwnershipExperience VARCHAR(100),
    ReasonForAdopting TEXT,
    ActivityLevel VARCHAR(100),
    TrainingWillingness VARCHAR(100),
    TypeOfResidence VARCHAR(100),
    LivingSituation VARCHAR(100),
    OutdoorSpaceAvailability BOOLEAN,
    PersonalStatement TEXT
);

-- Table for Breeds
CREATE TABLE Breeds (
    BreedID INT AUTO_INCREMENT PRIMARY KEY,
    BreedName VARCHAR(255) NOT NULL,
    PetType ENUM('Dog', 'Cat', 'Others') NOT NULL
);

-- Table for User Preferences
CREATE TABLE UserPreferences (
    PreferenceID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    PreferredPetType ENUM('Dog', 'Cat', 'Others'),
    BreedID INT,
    SizePreference VARCHAR(50),
    AgePreference VARCHAR(50),
    EnergyLevelPreference VARCHAR(50),
    SpecialConsiderations TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (BreedID) REFERENCES Breeds(BreedID)
);

-- Table for Current Pets
CREATE TABLE CurrentPets (
    PetID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    PetType VARCHAR(100),
    BreedID INT,
    Age VARCHAR(50),
    BehaviorAndCompatibility TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (BreedID) REFERENCES Breeds(BreedID)
);

-- Add any additional tables or fields as needed
