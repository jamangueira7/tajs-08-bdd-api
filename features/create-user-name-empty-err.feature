Feature: Create Users API - Geral
  Background:
    Given I have a running server
    Given The current date is "2023-11-23T00:00"

  Scenario: Error when creating a user with an empty name
    
    When I create a new user with the following details 4:
      | name  | birthDay   |
      |       | 1980-01-01 |
    Then I should receive an error message that the name cannot be empty