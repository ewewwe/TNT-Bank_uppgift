Feature: krav 5

Scenario:
    Given that I visit the bank site to test krav-5
    And I Press on login and enter my login information for Uffe
    When Click on desired account, in this case Lönekonto.
    Then I Should be able to view my latest transfers.
    And I Should be able to view my latest ten transfers.