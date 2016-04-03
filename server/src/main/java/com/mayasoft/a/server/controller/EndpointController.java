package com.mayasoft.a.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.mayasoft.a.server.dto.Message;

@Controller
@RequestMapping("/")
public class EndpointController {

	@Autowired
    private SimpMessageSendingOperations messenger;

	@RequestMapping(method = RequestMethod.GET)
    public String index(ModelMap model) {
        return "static/index.html";
    }
 
	@CrossOrigin
    @ResponseStatus(value = HttpStatus.OK)
	@RequestMapping(value = "/producer-endpoint/{id}", method = RequestMethod.POST)
	public void endpoint(@PathVariable("id") Long id, @RequestBody Message message) {
		messenger.convertAndSend("/queue/message/" + id , message);
    }
}
