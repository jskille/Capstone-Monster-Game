﻿#pragma strict

var target : GameObject;
var source : GameObject;
var targetHealth : health;
var direction : float;
var height : float;

function Start () {
	source = GameObject.FindWithTag("player");
	target = GameObject.FindWithTag("enemy");
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
	else if (collision.gameObject.name == "FireballAI(Clone)")
	{
		Destroy(this.rigidbody);
		Destroy(this.gameObject);
	}
}