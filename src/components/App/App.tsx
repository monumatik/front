import * as React from 'react';
import Creator from '../../classes/Creator';
import Api from '../../classes/Api';
import './App.css';
import ImageCrop from '../ImageCrop/ImageCrop';

class App extends React.PureComponent{

  private creator: Creator | undefined;

  state: any = {
    elements: [],
    selectedElementParams: {},
    loadButton: false,
    loadedImage: undefined,
    overrideElementId: undefined
  };

  async componentDidMount(): Promise<any> {
    let json = await Api.getProjectData();
    this.creator = new Creator(
      json
    );
    setTimeout(() => {
      this.setState({
        elements: this.creator?.getElementsList()
      });
    }, 1000);
  }

  onClickImageLoad = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.currentTarget.files){
      let elementId = event.currentTarget.getAttribute('data-element-id');
      let fileData = await URL.createObjectURL(event.currentTarget.files[0]);
      let imageObj = new Image();
      imageObj.src = fileData;
      this.setState({
        loadButton: true,
        loadedImage: imageObj,
        overrideElementId: elementId,
      });
    }
  }

  updateImageCallback = async (imageSrc: string) => {
    console.log(imageSrc)
    await this.creator?.updateElementImage(imageSrc, this.state.overrideElementId);
    setTimeout(() => {
      this.setState({
        elements: this.creator?.getElementsList(),
        loadButton: false
      });
    }, 0);
  }

  render(){
    return(
      <>
        <div>
          { 
            this.state.elements.map((element: any) => {
              return element.type == "Image" && element.replaceable ? (
                <div key={`C${element.id}`}>
                  <img
                    style={{maxHeight: "100px", maxWidth: "100px", objectFit: 'contain'}}
                    key={`${element.type}${element.id}`} 
                    // id={element.id}
                    
                    src={element.thumbSrc}></img>
                  <input
                    data-element-id={element.id}
                    key={`${element.id}`}
                    type='file'
                    accept='.png, .jpg, .jpeg'
                    onChange={this.onClickImageLoad}/>
                </div>
              ): '';
            }) 
          }
        </div>
        <div>
          {
            this.state.loadButton && 
            <ImageCrop
              closeModal={() => {
                this.setState({
                  loadButton: false, overrideElementId: undefined
                })
              }}
              elementId={this.state.overrideElementId}
              updateImageCallback={this.updateImageCallback}
              layer={this.creator?.getLayer()} 
              imageObj={this.state.loadedImage}/>
          }
          </div>
      </>
    );
  }

}

export default App;
