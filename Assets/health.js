#pragma strict

var currHealth : int;
var opponent : GameObject;

function Start () {
	currHealth = 100;
}

function Update () {
	checkHealth();
}

function checkHealth() {
	if (currHealth <= 0) {
		if (this.name != "Enemy")
		{
			opponent = GameObject.FindWithTag("enemy");
			opponent.GetComponent(CombatAIController).EnemyDead = true;
		}
		else
		{
			opponent = GameObject.FindWithTag("player");
			opponent.GetComponent(CombatAbilities).EnemyDead = true;
		}
		Destroy(this.gameObject);
	}
}