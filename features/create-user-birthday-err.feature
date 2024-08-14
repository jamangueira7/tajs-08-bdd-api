Feature: Create Users API - Geral
  Background:
    Given I have a running server
    Given The current date is "2023-11-23T00:00"

  Scenario: Error when creating a user with an invalid birth date

    When I create a new user with the following details 5:
      | name  | birthDay   |
      | Eve   | 2022-01-32 |
    Then I should receive an error message that the birth date is invalid
    And the user's category should be "adult" "2"