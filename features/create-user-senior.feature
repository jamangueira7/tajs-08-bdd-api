Feature: Create Users API

  Background:
  
    Given I have a running server
    Given The current date is "2023-11-23T00:00"

  Scenario: Create a senior user
    
    When I create a new user with the following details 3:
      | name     | birthDay   |
      | Bob      | 1950-01-01 |
    Then the user should be categorized as a "senior" "3"
    When I request the user with ID "3"
    Then I should receive a JSON response with the user's details "3"
    And the user's category should be "senior" "3"