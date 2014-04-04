#pragma strict

var moveRight : String;
var target : GameObject;
var source : GameObject;
var targetHealth : health;
var direction;

function Start () {
	var array : String[]= this.name.Split("-"[0]);
	source = GameObject.Find(array[1]);
	print(source.name);
	target = GameObject.Find(array[2]);
	var newArray : String[] = array[3].Split("("[0]);
	moveRight = newArray[0];
	direction = source.transform.rotation.y;
}

function Update () {
	if (direction == 0.7071068)
	{
		this.transform.position.x += 1;
	}
	else
	{
		this.transform.position.x -= 1;
	}
	if (Mathf.Abs(source.transform.position.x - this.transform.position.x) > 50)
	{
		Destroy(this.rigidbody);
		Destroy(this.gameObject);
	}
	else if(Mathf.Abs(source.transform.position.z - this.transform.position.z) > 50)
	{
		Destroy(this.rigidbody);
		Destroy(this.gameObject);
	}
	else if(Mathf.Abs(source.transform.position.y - this.transform.position.y) > 50)
	{
		Destroy(this.rigidbody);
		Destroy(this.gameObject);
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
}