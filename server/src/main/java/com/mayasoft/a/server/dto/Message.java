/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mayasoft.a.server.dto;

public class Message {

    private Long producerId;
    private String payload;

    public Message() {
    }

    public Message(Long producerId, String payload) {
        this.producerId = producerId;
        this.payload = payload;
    }

    public Long getProducerId() {
        return producerId;
    }

    public void setProducerId(Long producerId) {
        this.producerId = producerId;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }

}
