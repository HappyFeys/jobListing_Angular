import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FilterListComponent } from '../../components/filter-list/filter-list.component';
import { CardComponent } from '../../components/card/card.component';
import { ApiService } from '../../services/api.service';
import { Job } from '../../models/apiResponse.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FilterListComponent,
    CardComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{

  jobs!: Job[]
  appliedFilters!: string[]

  constructor(private apiService: ApiService) {}


  ngOnInit(): void {
    this.loadJobs()
  }

  loadJobs(){
    this.apiService.getJobs().subscribe((data)=>{
      this.jobs = data
      console.log(this.jobs);
    })
  }

  onFilterChange(filters: string[]){
    this.appliedFilters = filters

    this.appliedFilters.length > 0 ? this.filterJob() : this.loadJobs()
  }

  filterJob() {
    const levelFilters = this.appliedFilters.filter(f => ['Junior', 'Midweight', 'Senior'].includes(f));
    const newFilters = this.appliedFilters.includes('News');
    const featuredFilters = this.appliedFilters.includes('Featured');
    const languageFilters = this.appliedFilters.filter(f => ['JavaScript', 'Python', 'Ruby', 'HTML', 'CSS'].includes(f));
    const toolFilters = this.appliedFilters.filter(f => ['React', 'Sass', 'Vue', 'RoR'].includes(f));
  
    this.jobs = this.jobs.filter(job => {
      const matchLevel = levelFilters.length ? levelFilters.includes(job.level) : true;
      const matchNew = newFilters ? job.new : true;
      const matchFeatured = featuredFilters ? job.featured : true;
      const matchLanguages = languageFilters.length ? languageFilters.some(lang => job.languages.includes(lang)) : true;
      const matchTools = toolFilters.length ? toolFilters.some(tool => job.tools.includes(tool)) : true;
  
      return matchLevel && matchNew && matchFeatured && matchLanguages && matchTools;
    });
  }
  
}
