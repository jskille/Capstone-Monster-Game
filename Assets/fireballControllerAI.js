#pragma strict

var target : GameObject;
var source : GameObject;
var targetHealth : health;
var direction : float;
var height : float;

function Start () {
	source = GameObject.FindWithTag("enemy");
	target = GameObject.FindWithTag("player");
	direction = source.transform.rotation.y;
	height = source.transform.position.y;
}

function Update () {
	if (direction <= 0.71 && direction >= 0.70)
	{
		this.transform.position.x += 40 * Time.deltaTime;
		this.transform.position.y = height;
	}
	else
	{
		this.transform.position.x -= 40 * Time.deltaTime;
		this.transform.position.y = height;
	}
}

function OnCollisionEnter(collision : Collision) {
	if (collision.gameObject.name == target.name)
	{
		var targetHealth = target.GetComponent(health);
		targetHealth.currHealth -= 20;
		Destroy(this.rigidbody);
		Destroy(this.gameObject);
	}
	else if (collision.gameObject.name == "Fireball(Clone)")
	{
		Destroy(this.rigidbody);
		Destroy(this.gameObject);
	}
	else if (collision.gameObject.name == "Woodfence")
	{
		Destroy(this.rigidbody);
		Destroy(this.gameObject);
	}
}