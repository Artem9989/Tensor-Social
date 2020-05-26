define(function () {
    'use strict';

    class GalleryModel {
        constructor(userid, domain) {
            this.userid = userid;
            this.domain = domain;
            //this.data = domain.data;

        }

        async listPhoto(userid){
            let responce = await fetch(this.domain + '/photo/list/' + userid, { credentials: 'include'});
            if(responce.status >= 200 && responce.status < 300){
                let result = await responce.json();
                let list = result.photos.map((photo) => {  return { id: photo.id , pathPhoto: this.domain + photo.path} });
                return list;
            }
            throw new Error(responce.status);
        }

        async photoUpload(photo){ 
            let responce = await fetch(this.domain + '/photo/upload', {method: 'POST', credentials: 'include', body: photo});
            if(responce.status >= 200 && responce.status < 300){
                let result = await responce.json();
                return result;
            }
            throw new Error(responce.status);
        }

        async photoDelete(id){
            let responce = await fetch(this.domain + '/photo/delete', {method: 'POST', credentials: 'include', body: new URLSearchParams({
                    photo_id: id
                }) 
            });
            if(responce.status >= 200 && responce.status < 300){
                let result = await responce;
                return result;
            }
            throw new Error(responce.status);
        }

    }

    return GalleryModel;
});