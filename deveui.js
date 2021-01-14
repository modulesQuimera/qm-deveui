module.exports = function(RED) {

	function deveuiNode(config) {
		RED.nodes.createNode(this,config);
		this.deveui = config.deveui;
		var node = this;
		
		node.on('input', function(msg) {
			var _compare = {};
			var globalContext = node.context().global;
			var currentMode = globalContext.get("currentMode");
			var file = globalContext.get("exportFile");
            var slot = globalContext.get("slot");
            
            
			var command =  {
				type: "processing_modular_V1_0",
				slot: 1,
				method: "deveui_info",
				compare: {},
				get_output: {},
				deveui: node.deveui,
			};
			
			if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command);
                }
                else{
                    file.slots[slot].jig_error.push(command);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                }
                else{
                    file.slots[3].jig_test.push(command);
                }
            }
			globalContext.set("exportFile", file);
			console.log(command)
			node.send(msg);
		});
	}
	RED.nodes.registerType("deveui", deveuiNode);
}