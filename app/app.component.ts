import { Component, OnInit, ElementRef } from '@angular/core';
declare var $:JQueryStatic;

@Component({
	selector: 'allgator-timer',
	template: `
		<div *ngIf="text" class="alligator-timer">
			<p>{{text}}</p>
		</div>
	`
})
export class AppComponent implements OnInit {
	public timestamp: number;
	public text: string;

	public constructor(public element: ElementRef) {

	}

	public ngOnInit() {
		let date = new Date;
		let realTime = date.getTime();

		this.timestamp = parseInt($(this.element.nativeElement).attr('timestamp'));

		setInterval(() => {
			this.render(this.timestamp);
		}, 1000);
	}

	public render(timestamp: number) {
		let text = '';
		let date = new Date;
		let realTime = date.getTime();
		let timeDiff = timestamp - realTime;

		let waitDays    = Math.floor(timeDiff / 1000 / 60 / 60 / 24);
		let waitHours   = Math.floor((timeDiff / 1000 / 60 / 60) % 24);
		let waitMinutes = Math.floor((timeDiff / 1000 / 60) % 60);
		let waitSecond  = Math.floor((timeDiff / 1000) % 60);

		text = this.addZero(waitDays)
		+ ' :' + this.addZero(waitHours)
		+ ' :' + this.addZero(waitMinutes)
		+ ' :' + this.addZero(waitSecond);

		this.text = text;
	}

	private addZero(value: number): string {
		if(value < 10) return '0' + value.toString();

		return value.toString();
	}

}
