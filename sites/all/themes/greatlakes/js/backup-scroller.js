(function($) {
	var active = 0;
	var min = 0;
	var max = 0;
	var timer;

	$(function()
	{
		$("#block-views-fascility-slider-block .prev").click(clickPrevious);
		$("#block-views-fascility-slider-block .next").click(clickNext);
		$("#block-views-fascility-slider-block .views-row").click(stop);

		max = rows().length;

		var $first = rows().eq(0).clone();
		var $second = rows().eq(1).clone();
		var $third = rows().eq(2).clone();
		//$first.find("[rel=gallery-all]").attr("rel","");
		//$second.find("[rel=gallery-all]").attr("rel","");
		//$third.find("[rel=gallery-all]").attr("rel","");
	

		container().append($first).append($second).append($third);
		start();
		setTimeout(layout, 50);
		$(window).resize(layout);
	});

	function start()
	{
		timer = setInterval(timerNext, 2000);
	}

	function container()
	{
		return $("#block-views-fascility-slider-block .view-content");
	}

	function rows()
	{
		return container().find(".views-row");
	}

	function layout()
	{
		var numRows = rows().length;
		var containerWidth = numRows * rowWidth();
		var width = 1/numRows*100
		container().width(containerWidth+"%");
		rows().width(width+"%");
	}

	function moveContainer()
	{
		var left = "-" + (active*rowWidth()) + "%";
		container().stop(false, false).animate({"left":left});
	}

	function jumpToEnd()
	{
		var active = rows().length-rowsPerPage();
		var left = "-" + (active*rowWidth()) + "%";
		container().css({"left":left});
	}

	function jumpToBeginning()
	{
		var active = min;
		var left = "-" + (active*rowWidth()) + "%";
		container().css({"left":left});
	}

	function rowWidth()
	{
		return 100/rowsPerPage();
	}

	function rowsPerPage()
	{
		if (isMobile())
		{
			return 1;
		}
		else if (isTablet())
		{
			return 2;
		}
		
		return 3;
	}

	function isMobile()
	{
		return $(window).width() < 540;
	}

	function isTablet()
	{
		return $(window).width() < 1220;
	}

	function previous()
	{
		active--;
		if (active < min)
		{
			jumpToEnd();
			active = max-1;
		}
		moveContainer();
	}

	function next()
	{
		active++;
		if (active > max)
		{
			jumpToBeginning();
			active = min+1;
		}
		moveContainer();
	}

	function clickPrevious()
	{
		previous();
		stop();
		return false;
	}

	function clickNext()
	{
		next();
		stop();
		return false;
	}

	function stop()
	{
		clearInterval(timer);
	}


	function timerNext()
	{
		next();
		layout();
	}

}(jQuery));
