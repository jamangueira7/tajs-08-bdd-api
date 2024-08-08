Feature: Create Users API
  Background:
    Given I have a running server
    Given The current date is "2023-11-23T00:00"

  Scenario: Create a new user that is 23 years old and categorize them as young-adult
    
    When I create a new user with the following details 1:
      | name          | birthDay   |
      | Erick Wendel  | 2000-01-01 |

    Then I request the API with the user's ID "1"
    Then I should receive a JSON response with the user's details "1"
    Then The user's category should be "young-adult" "1"