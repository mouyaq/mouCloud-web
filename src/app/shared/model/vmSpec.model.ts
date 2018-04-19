export class VmSpec {
    spec: {
        name?: string;
        guest_OS: string;
        placement: {
            datastore: string;
            folder: string;
            resource_pool: string;
        };
    };

}


// {
//     "spec": {
//     	"name": "test4Lenovo",
//         "guest_OS": "UBUNTU_64",
//         "placement" : {
//             "datastore": "datastore-15",
//             "folder": "group-v61",
//             "resource_pool": "resgroup-33"
//         }
//     }
// }
