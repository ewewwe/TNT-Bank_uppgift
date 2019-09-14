Feature: Överföring till annan

  Överföring till annan, krav 9

  Scenario: Överför 100kr från Sara till Anna
    Given that I visit the bank site to test krav-9
    And I press on login and enter my login information for Sara
    When I transfer 100kr to another account
    Then the recipient account should recieve 100kr