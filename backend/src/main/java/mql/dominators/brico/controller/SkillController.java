package mql.dominators.brico.controller;

import java.util.List;

import mql.dominators.brico.entities.Experience;
import mql.dominators.brico.entities.Handyman;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mql.dominators.brico.entities.Skill;
import mql.dominators.brico.entities.User;
import mql.dominators.brico.security.CustomUserDetails;
import mql.dominators.brico.service.SkillService;
import mql.dominators.brico.utils.UserAuthenticated;

@RestController
@RequestMapping(path = "/skill")
public class SkillController {
	
	@Autowired
	private SkillService skillService;

	@Autowired
	private UserAuthenticated userAuth;

	@GetMapping
	public List<Skill> getAllSkills() {
		return this.skillService.getAllSkills();
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Skill> getSkill(@PathVariable(name = "id") Long id) {
		Skill skill = this.skillService.getSkill(id);
		if (skill != null) {
			return ResponseEntity.status(200).body(skill);
		}
		return ResponseEntity.noContent().build();
	}

	@PostMapping
	public ResponseEntity<Skill> save(@RequestBody Skill skill,@AuthenticationPrincipal CustomUserDetails customUserDetails) {
		return ResponseEntity.status(200).body(skillService.saveSkill(skill,(Handyman)customUserDetails.getUser()));
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Skill> save(@PathVariable(name = "id") Long id, @RequestBody Skill skill) {
		System.out.println(skill.getTitle());
		Skill updateSkill = skillService.updateSkill(id, skill);
		return ResponseEntity.ok(updateSkill);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Skill> save(@PathVariable(name = "id") Long id) {
		skillService.deleteSkill(id);
		return ResponseEntity.status(HttpStatus.ACCEPTED).build();
	}

	@GetMapping(value = "/title/{title}")
	public Skill getSkillByTitle(@PathVariable(name = "title") String title) {
		return this.skillService.findByTitle(title);
	}

	@GetMapping(path="/handyman/{username}") 
	public List<Skill> skillsPerUser(@PathVariable String username) {
		return this.skillService.getSkillsByUsername(username);
	}

}
