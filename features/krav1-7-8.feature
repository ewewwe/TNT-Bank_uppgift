Feature: krav-1-7-8
When I log on the website it should open and i should be able
to create accounts, rename and delete them

Scenario: Add, rename and delete account
Given that I visit the bank site to test krav-1-7-8
When I Press on login and enter my login information for Bengt
And Go to my accounts
Then I Should be able to add a bank account, rename it and delete it again and logout.

