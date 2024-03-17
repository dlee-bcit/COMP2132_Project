/*
    Author: 	David Lee
    Student #: 	A00842504
    Date:   	2024/02/26
	Notes:		BCIT COMP2132 Assignment
	Usage:      main menu responsive navigation script
*/

{
	const $btn = $(".button-menu");
	const $nav = $("nav");

	//event - menu button click
	$btn.on("click", toggleNav);

	//event - window resize
	$(window).on("resize", windowResize)

	/* function - toggling Nav with slide animation */
	function toggleNav(e)
	{
		$nav.slideToggle();
	}

	/* function - window resize */
	function windowResize(e)
	{
		//less than or equal to max width 428px
		if(window.matchMedia('(max-width: 428px)').matches)
		{
			//always hide nav
			$nav.hide();
		}
		//bigger than 428px;
		else
		{
			//always show nav
			$nav.show();
		}
	}
}