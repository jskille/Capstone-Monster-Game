// This makes the character turn to face the current movement speed per default.
var autoRotate : boolean = true;
var maxRotationSpeed : float = 360;
var bumpRight = 0.1;
var bumpLeft = -0.1;
var vertical : float = 0;
var horizontal : float = 0;
var facingRight : boolean = true;

public var idleAnimation : AnimationClip;
public var walkAnimation : AnimationClip;
public var runAnimation : AnimationClip;
public var jumpPoseAnimation : AnimationClip;

public var walkMaxAnimationSpeed : float = 0.75;
public var trotMaxAnimationSpeed : float = 1.0;
public var runMaxAnimationSpeed : float = 1.0;
public var jumpAnimationSpeed : float = 1.15;
public var landAnimationSpeed : float = 1.0;

private var _animation : Animation;
private var motor : CharacterMotor;

// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterMotor);
	_animation = GetComponent(Animation);
	if(!_animation)
		Debug.Log("The character you would like to control doesn't have animations. Moving her might look weird.");

	if(!idleAnimation) {
		_animation = null;
		Debug.Log("No idle animation found. Turning off animations.");
	}
	if(!walkAnimation) {
		_animation = null;
		Debug.Log("No walk animation found. Turning off animations.");
	}
	if(!runAnimation) {
		_animation = null;
		Debug.Log("No run animation found. Turning off animations.");
	}
	if(!jumpPoseAnimation) {
		_animation = null;
		Debug.Log("No jump animation found and the character has canJump enabled. Turning off animations.");
	}
}

// Update is called once per frame
function Update () {
	this.transform.position.z = 36.47913;
	// Get the input vector from kayboard or analog stick
	var rightDirection : boolean = Input.GetKey("right");
	var leftDirection : boolean = Input.GetKey("left");
	if (rightDirection)
	{
		horizontal += bumpRight;
		bumpRight *= 2;
		if (horizontal == 0.1 && !facingRight)
		{
			this.transform.RotateAround(this.transform.position, Vector3(0, 1, 0), 180);
			facingRight = true;	
		}
		vertical = 0.3;
	}
	else
	{
		bumpRight = 0.1;
	}
	if (leftDirection)
	{
		horizontal += bumpLeft;
		bumpLeft *= 2;
		if (horizontal == -0.1 && facingRight)
		{
			this.transform.RotateAround(this.transform.position, Vector3(0, 1, 0), 180);
			facingRight = false;
		}
		vertical = 0.3;
	}
	else
	{
		bumpLeft = -0.1;
	}
	
	if (!rightDirection && !leftDirection)
	{
		horizontal = 0;
		vertical = 0;
		_animation.CrossFade(idleAnimation.name);
	}
	
	if (horizontal > 1)
		horizontal = 1;
	else if (horizontal < -1)
		horizontal = -1;
		
	if (horizontal != 0)
	{
		_animation[walkAnimation.name].speed = walkMaxAnimationSpeed;
		_animation.CrossFade(walkAnimation.name);
	}
	
	var directionVector = new Vector3(horizontal, vertical, 0);
	
	// Apply the direction to the CharacterMotor
	motor.inputMoveDirection = directionVector;
	motor.inputJump = Input.GetButton("Jump");
	
	// Set rotation to the move direction	
	if (autoRotate && directionVector.sqrMagnitude > 0.01) {
		var newForward : Vector3 = ConstantSlerp(
			transform.forward,
			directionVector,
			maxRotationSpeed * Time.deltaTime
		);
		newForward = ProjectOntoPlane(newForward, transform.up);
		transform.rotation = Quaternion.LookRotation(newForward, transform.up);
	}
}

function ProjectOntoPlane (v : Vector3, normal : Vector3) {
	return v - Vector3.Project(v, normal);
}

function ConstantSlerp (from : Vector3, to : Vector3, angle : float) {
	var value : float = Mathf.Min(1, angle / Vector3.Angle(from, to));
	return Vector3.Slerp(from, to, value);
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/Combat Input Controller")