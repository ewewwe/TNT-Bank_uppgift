Feature: Sweden Bank
When entering the bank site
everything should work according to specifications.

Scenario: Transaktionshistorik (5 senaste) och Överföring mellan egna konton
Given that I visit the bank site to test krav-1-4-11
And I press on login and enter my login information for Anna
Then I should be able to see my five last transactions
And my different accounts with their respective balance
And I should be able to transfer money between my own accounts, in this case Lönekonto to Bensinkonto