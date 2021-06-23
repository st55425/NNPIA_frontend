# NNPIA_Sem_Prace
Semestální práce z předmětu Programování internetových aplikací. Jedná se o Rezervační systém pro sportovní areály

Tento repozitář obsahuje pouze frontend dané aplikace
Komukace s frontendem probíhá skrze rest api

Použité technologie:
* Angular 
* Typescript
* PrimeNg

Pro zabezpečení endpointů jsou využity jwt tokeny

Pro nepřihlášené uživatele je zpřístupněna část pro zobrazení jednotlivých sportovišť, přihlášený uživatel (role user)
může navíc vytvářet a mazat vlastní rezervace, dále správce (role staff) může vytvářet a rušit rezervace všem uživatelům a admin navíc může spravovat sportoviště

Aplikace prozatím neumožňuje vytvářet a spravovat uživatele, aktuálně aplikace obsahuje 3 uživatele:

* uživatelské jméno: user
* heslo: user
* role: user


* uživatelské jméno: staff

* heslo: staff

* role: staff


* uživatelské jméno: admin

* heslo: admin

* role: admin
