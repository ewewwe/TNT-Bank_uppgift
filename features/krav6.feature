Feature: Visa fler transaktioner

  Visa fler transaktioner, krav 6

  Scenario: Visa fler transaktioner för konto
    Given att jag besöker banksidan
    And loggar in med testkontot
    When jag navigerar till mina konto
    And Klickar på kontot med minst elva transaktioner
    And jag klickar på Visa fler
    Then ska minst elva transaktioner visas

