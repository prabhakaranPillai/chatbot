import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import ApexCharts from 'apexcharts';

export interface KPI {
  title: string;
  value: number;
  previousPeriod: number;
  percentage: number;
  category: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
})
export class DashboardComponent implements OnInit {
  selectedRange: string = 'weekly';
  kpis: KPI[] = [
    {
      title: 'Revenue',
      value: 1000,
      previousPeriod: 1100,
      percentage: -10,
      category: 'monthly',
    },
    {
      title: 'Total Users',
      value: 50,
      previousPeriod: 25,
      percentage: 50,
      category: 'monthly',
    },
    {
      title: 'Conversion Rate',
      value: 100,
      previousPeriod: 80,
      category: 'monthly',
      percentage: -20,
    },
    {
      title: 'Revenue',
      value: 5000,
      previousPeriod: 6000,
      percentage: -20,
      category: 'yearly',
    },
    {
      title: 'Total Users',
      value: 100,
      previousPeriod: 90,
      percentage: 10,
      category: 'yearly',
    },
    {
      title: 'Conversion Rate',
      value: 10,
      previousPeriod: 8,
      category: 'yearly',
      percentage: -20,
    },
    {
      title: 'Revenue',
      value: 100,
      previousPeriod: 90,
      percentage: -10,
      category: 'weekly',
    },
    {
      title: 'Total Users',
      value: 5,
      previousPeriod: 10,
      percentage: 50,
      category: 'weekly',
    },
    {
      title: 'Conversion Rate',
      value: 10,
      previousPeriod: 8,
      category: 'weekly',
      percentage: -20,
    },
  ];

  selectRange(range: string) {
    this.selectedRange = range;
    console.log('Selected Range:', range);
  }

  get filteredKPIs() {
    return this.kpis.filter((kpi) => kpi.category === this.selectedRange);
  }

  ngOnInit() {
    // line chart
    const options: any = {
      chart: {
        type: 'line',
        height: 400,
        width: 800,
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: { height: 300, width: 300 },
          },
        },
      ],
      series: [
        { name: 'Revenue', data: [10, 20, 30, 40, 50, 2, 20, 30, 21, 9, 8, 2] },
      ],
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'may',
          'june',
          'july',
          'aug',
          'sep',
          'oct',
          'nov',
          'dec',
        ],
      },
    };
    const lineChart = new ApexCharts(
      document.querySelector('#line-chart')!,
      options,
    );
    lineChart.render();

    // piechart
    const optionsForPieChart: any = {
      chart: {
        type: 'pie',
        height: 400,
        width: 400,
      },

      series: [10, 20, 30, 40],
      labels: ['TV', 'laptops', 'mobiles', 'others'],
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 300,
            },
          },
        },
      ],
      legend: {
        position: 'bottom',
        offsetY: 0,
      },
    };

    const pieChart = new ApexCharts(
      document.querySelector('#pie-chart')!,
      optionsForPieChart,
    );
    pieChart.render();
  }
}
