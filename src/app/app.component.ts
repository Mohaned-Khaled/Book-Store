import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}

  pivotIndex(nums) {
    let leftSide = 0;
    let rightSide = nums.reduce((acc, num) => acc + num) - nums[0];
    if (rightSide === 0) return 0;

    for (let i = 1; i < nums.length; i++) {
      rightSide -= nums[i];
      leftSide += nums[i - 1];

      if (leftSide === rightSide) return i;
    }

    return -1;
  }
}
