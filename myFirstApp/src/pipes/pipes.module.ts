import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { GetTagsPipe } from './get-tags/get-tags';
@NgModule({
	declarations: [
	  ThumbnailPipe,
    GetTagsPipe],
	imports: [],
	exports: [
	  ThumbnailPipe,
    GetTagsPipe]
})
export class PipesModule {}
