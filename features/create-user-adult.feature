Feature: Create Users API
  Background:
    Given I have a running server
    Given The current date is "2023-11-23T00:00"

  Scenario: Create an adult user

    When I create a new user with the following details 2:
      | name     | birthDay   |
      | Jane     | 1980-01-01 |
    Then the user should be categorized as an "adult" "2"
    When I request the user with ID "2"
    Then I should receive a JSON response with the user's details "2"
    And the user's category should be "adult" "2"