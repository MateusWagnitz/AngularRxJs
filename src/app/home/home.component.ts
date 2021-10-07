import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStore } from '../services/courses.store';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(
    private coursesStore: CoursesStore,
    // private loadingService: LoadingService,
    // private messagesService: MessagesService
    ) {

  }

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {

    //#region comentarios

    // Aproach with loading on/off with finalize

    // this.loadingService.loadingOn();

    // const courses$ = this.coursesService.loadAllCourses()
    // .pipe(
    //   map(courses => courses.sort(sortCoursesBySeqNo)),
    //   finalize(() => this.loadingService.loadingOff())
    // );

  // ######################################################################

  // Aproach with ShowloaderUntilCompleted
  // const courses$ = this.coursesService.loadAllCourses()
  //   .pipe(
  //     map(courses => courses.sort(sortCoursesBySeqNo)),
  //     catchError(err => {
  //       const message = "Error loading courses";
  //       this.messagesService.showErrors(message);
  //       console.log(message, err);
  //       return throwError(err);
  //     })
  //   );

  // const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);

  // for both previous solutions
  // this.beginnerCourses$ = loadCourses$
  //   .pipe(
  //     map(courses => courses.filter(courses => courses.category == "BEGINNER"))
  //   );

  // this.advancedCourses$ = loadCourses$
  //   .pipe(
  //     map(courses => courses.filter(courses => courses.category == "ADVANCED"))
  //   );
    //#endregion

  this.beginnerCourses$ = this.coursesStore.filterByCategory("BEGINNER")

  this.advancedCourses$ = this.coursesStore.filterByCategory("ADVANCED")

 }

}




