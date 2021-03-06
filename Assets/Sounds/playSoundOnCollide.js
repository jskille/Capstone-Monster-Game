﻿#pragma strict

// Audio Sound
    var ImpactSound : AudioClip;
    var EatSound : AudioClip;
     
    function OnControllerColliderHit (hit : ControllerColliderHit)
    {
    // Detects and Prints the Current Collision
    //Debug.Log("Hit"+ hit.gameObject.name);

    var body : Rigidbody = hit.collider.attachedRigidbody;

    

    // Play Audio Sound If Collision is detected!
    if(hit.gameObject.name == "Ball(Clone)") audio.PlayOneShot(ImpactSound);
    if(hit.gameObject.name == "Pizza(Clone)") audio.PlayOneShot(EatSound); 
    
    }