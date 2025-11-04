import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfGen } from "./pdf-gen/pdf-gen";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PdfGen],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'pdf-play';
}
