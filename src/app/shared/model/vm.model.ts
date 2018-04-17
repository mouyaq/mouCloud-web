export class Vm {
    vm?: string;
    name: string;
    cpu?: {
        count: number
    };
    memory?: {
        size_MiB: string,
        hot_add_enabled?: boolean
    };
    power_state?: string;
}



/*
"memory_size_MiB": 512,
"vm": "vm-18",
"name": "xiaomi01vm",
"power_state": "POWERED_OFF",
"cpu_count": 1




{
    "value": {
        "cdroms": [
            {
                "value": {
                    "start_connected": true,
                    "backing": {
                        "iso_file": "[REPOSITORIO] SOFTWARE/LINUX/UBUNTU/ubuntu-16.04.4-server-amd64.iso",
                        "type": "ISO_FILE"
                    },
                    "allow_guest_control": true,
                    "label": "CD/DVD drive 1",
                    "state": "NOT_CONNECTED",
                    "type": "SATA",
                    "sata": {
                        "bus": 0,
                        "unit": 0
                    }
                },
                "key": "16000"
            }
        ],
        "memory": {
            "size_MiB": 512,
            "hot_add_enabled": false
        },
        "disks": [
            {
                "value": {
                    "scsi": {
                        "bus": 0,
                        "unit": 0
                    },
                    "backing": {
                        "vmdk_file": "[VMS] xiaomi01vm/xiaomi01vm.vmdk",
                        "type": "VMDK_FILE"
                    },
                    "label": "Hard disk 1",
                    "type": "SCSI",
                    "capacity": 10737418240
                },
                "key": "2000"
            }
        ],
        "parallel_ports": [],
        "sata_adapters": [
            {
                "value": {
                    "bus": 0,
                    "pci_slot_number": 33,
                    "label": "SATA controller 0",
                    "type": "AHCI"
                },
                "key": "15000"
            }
        ],
        "cpu": {
            "hot_remove_enabled": false,
            "count": 1,
            "hot_add_enabled": false,
            "cores_per_socket": 1
        },
        "scsi_adapters": [
            {
                "value": {
                    "scsi": {
                        "bus": 0,
                        "unit": 7
                    },
                    "pci_slot_number": 16,
                    "label": "SCSI controller 0",
                    "type": "LSILOGIC",
                    "sharing": "NONE"
                },
                "key": "1000"
            }
        ],
        "power_state": "POWERED_OFF",
        "floppies": [],
        "name": "xiaomi01vm",
        "nics": [
            {
                "value": {
                    "start_connected": true,
                    "pci_slot_number": 160,
                    "backing": {
                        "connection_cookie": 1934204955,
                        "distributed_switch_uuid": "50 12 6a 75 b6 c3 cd 02-17 c7 a8 1c e0 bb c5 67",
                        "distributed_port": "15",
                        "type": "DISTRIBUTED_PORTGROUP",
                        "network": "dvportgroup-38"
                    },
                    "mac_address": "00:0C:29:CC:82:41",
                    "mac_type": "GENERATED",
                    "allow_guest_control": true,
                    "wake_on_lan_enabled": true,
                    "label": "Network adapter 1",
                    "state": "NOT_CONNECTED",
                    "type": "VMXNET3",
                    "upt_compatibility_enabled": true
                },
                "key": "4000"
            }
        ],
        "boot": {
            "delay": 0,
            "retry_delay": 10,
            "enter_setup_mode": false,
            "type": "BIOS",
            "retry": false
        },
        "serial_ports": [],
        "guest_OS": "UBUNTU_64",
        "boot_devices": [],
        "hardware": {
            "upgrade_policy": "NEVER",
            "upgrade_status": "NONE",
            "version": "VMX_13"
        }
    }
}

*/