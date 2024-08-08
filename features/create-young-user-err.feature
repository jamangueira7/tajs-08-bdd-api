Feature: Create Users API
  Background:
    Given I have a running server
    Given The current date is "2023-11-23T00:00"

  Scenario: Error when creating a user who is younger than 18 years old

    When I create a young user with the following details:
      | name  | birthDay   |
      | Alice | 2015-01-01 |

    Then I should receive an error message that the user must be at least 18 years old